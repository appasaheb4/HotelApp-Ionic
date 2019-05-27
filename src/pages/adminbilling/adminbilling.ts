import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides,AlertController,Platform} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
          

import { ProadminbillingProvider } from '../../providers/proadminbilling/proadminbilling';
import { HomePage } from '../home/home';
//@IonicPage()
@Component({
  selector: 'page-adminbilling',
  templateUrl: 'adminbilling.html',
  providers:[ProadminbillingProvider]
})
export class AdminbillingPage {
private printData: any = [];
letterObj = {
    to: '',  
    from: '',
    text: ''  
  }
  pdfObj = null;
  private getAllBookingList:any;

     data ={userId:""};

  constructor(public navCtrl: NavController, public navParams: NavParams,private plt: Platform, private file: File, private fileOpener: FileOpener,public alertCtrl: AlertController,private  personservice:ProadminbillingProvider,private storage:Storage,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController,private _form:FormBuilder) {
this.storage.get('userId').then((val) => {
this.data.userId=val;
}); 

  }

ionViewWillEnter(){
this.getBookingData();
}

    getBookingData(){
this.personservice.getAllBookingData()
.then(data =>{  
this.getAllBookingList=data;
});
    }

     
doRefresh(refresher){
    this.getAllBookingList=null;
    this.getBookingData();
      if(refresher != 0)
         refresher.complete();
};

paid(id,tableNo,totalAmount){
console.log(totalAmount);
let confirm = this.alertCtrl.create({
      title: 'Hint',
      message: 'Are you sure total amount paid !',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }       
        },    
        {
          text: 'Yes',
          handler: () => {
let loader = this.loading.create({
    content: 'Wating.........',
  });
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
  let data = {
  id: id, 
   tableNo: tableNo,
    paidAmountWeb: totalAmount,
}  
this.http.post('http://hotelsameer.web44.net/TableBooking/adminPaidAmount', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Paid amount done.',
    duration: 2000
  });
  toast.present();
    this.getAllBookingList=null;
    this.getBookingData();
  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Paid amount not done.',
		    duration: 2000
		  });
		  toast.present();
});
 });




          }
        }
      ]
    });
    confirm.present();
}


deleteData(localId,tableNo){
let confirm = this.alertCtrl.create({
      title: 'Hint',
      message: 'Are you sure table booking remove !',
      buttons: [
        {
          text: 'No',  
          handler: () => {
            console.log('Disagree clicked');
          }
        },  
        {
          text: 'Yes',
          handler: () => {
let loader = this.loading.create({
    content: 'Wating.........',
  });
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
  let data = {
  id: localId,
  tableNo:tableNo,   
}  
this.http.post('http://hotelsameer.web44.net/TableBooking/deleteTableBooking', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Booking table remove.',
    duration: 2000    
  });   
  toast.present();
   this.getAllBookingList=null;
    this.getBookingData();
  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Booking table not remove.',
		    duration: 2000
		  });
		  toast.present();
});
 });
    }
        }
      ]
    });
    confirm.present();
}







  createPdf(dataLocal) {
    var headers = {
    fila_0:{
        col_1:{ text: 'ITEM NAME', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_2:{ text: 'QTY', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_3:{ text: 'PRICE', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
        col_4:{ text: 'AMOUNT', style: 'tableHeader',rowSpan: 2, alignment: 'center',margin: [0, 8, 0, 0] },
       
    },
    fila_1:{
        col_1:{ text: 'Header 1', style: 'tableHeader', alignment: 'center' },
        col_2:{ text: 'Header 2', style: 'tableHeader', alignment: 'center' }, 
        col_3:{ text: 'Header 3', style: 'tableHeader', alignment: 'center' },
        col_4:{ text: 'Header 4', style: 'tableHeader', alignment: 'center' },
    }
}
var rows= dataLocal[0].extraMenuList;

 
//console.log(rows[0].id);

var body = [];
for (var key in headers){
    if (headers.hasOwnProperty(key)){
        var header = headers[key];
        var row = new Array();
        row.push( header.col_1 );
        row.push( header.col_2 );
        row.push( header.col_3 );
        row.push( header.col_4 );
        body.push(row);
    }
}

 for(var i = 0; i < rows.length; i++){
        var row = new Array();
        row.push( rows[i].ExsubMenuName.toString() );
        row.push( rows[i].ExQty.toString()  );
        row.push( rows[i].ExPrice.toString() );
        row.push( rows[i].ExTotalAmount.toString() );   
        body.push(row);
    }
var dd = {
        pageOrientation: 'portrait',   
        pageSize: 'A5',    
        content: [
        { text: '...OM SAI RAM...', style: 'nameHeader' },
        { text: 'HOTEL SAMEER', style: 'hotleName' },
        { text: 'SHET KARI BHOJNALYA', alignment: 'center' },
        { text: 'M. P. K. V RAHURI', alignment: 'center' },
        { text: 'AHEMADNAGAR.  413722', alignment: 'center' },
        { text: 'MOB NO. 9673482966', alignment: 'center' },   
        { text: 'BILL NO: '+dataLocal[0].idDP , alignment: 'right' },
        { text: 'DATE: '+dataLocal[0].dateDP +'  TIME: '+dataLocal[0].timeDP, alignment: 'right' },
            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', '*', '*'],
                    headerRows: 2,
                    body: body
                }
            },
            { text: ' ' , alignment: 'right' },
            { text: 'Total Item (s) : '+ dataLocal[0].extralTotalItem , alignment: 'right' },
            { text: 'Total Amount :Rs.'+ dataLocal[0].price , alignment: 'right' },
            { text: 'THANKS....VISIT AGAIN', alignment: 'center' }

],
        styles: {
            header: {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'right'
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 20, 0, 5]
            },
            itemsTable: {
                margin: [0, 5, 0, 15]
            },
            itemsTableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            totalsTable: {
                bold: true,
                margin: [0, 20, 0, 0]
            },
 nameHeader: {
         alignment: 'center'
        },
hotleName:{
 alignment: 'center',
fontSize: 35,   
fontfamily: 'Courgette'
},
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
        }
}

    this.pdfObj = pdfMake.createPdf(dd);
    this.downloadPdf(); 
  }        
 
getPrintDataAgain(bookingId){
this.personservice.getBookingPrintData(bookingId)
.then(data =>{     
this.createPdf(data); 

});

}   


  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App  
        this.file.writeFile(this.file.dataDirectory, 'Hotel.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'Hotel.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }


insertPrintItem(bookingId){
 let loader = this.loading.create({
    content: 'Wating.........',
  });
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
  let data = {
  tableBookingId:bookingId, 
  userId:this.data.userId,        
}  
this.http.post('http://hotelsameer.web44.net/AdminBillingPrint/insertPrintData', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    this.getPrintDataAgain(bookingId);
 
  }
}, (err) => {
	loader.dismiss();
	  
});
 });
}

}
