import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';      
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { CallNumber } from '@ionic-native/call-number';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';

      
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CreatepdfPage } from '../pages/createpdf/createpdf';
import { AdminbillingPage } from '../pages/adminbilling/adminbilling';
import { AdminexpenditurePage } from '../pages/adminexpenditure/adminexpenditure';
import { AdminpurchasePage } from '../pages/adminpurchase/adminpurchase';
import { AdminwinebottelesstockPage } from '../pages/adminwinebottelesstock/adminwinebottelesstock';
import { KitchendashboardPage } from '../pages/kitchendashboard/kitchendashboard';
import { KitchenorderviewPage } from '../pages/kitchenorderview/kitchenorderview';
import { WaiterdashboardPage } from '../pages/waiterdashboard/waiterdashboard';
import { WaiterorderPage } from '../pages/waiterorder/waiterorder';
import { WaitertableviewPage } from '../pages/waitertableview/waitertableview';
import { AdminaddvendorPage } from '../pages/adminaddvendor/adminaddvendor';
import { WaitertablebookingPage } from '../pages/waitertablebooking/waitertablebooking';
import { WaitertablebookingextraPage } from '../pages/waitertablebookingextra/waitertablebookingextra';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { SharePage } from '../pages/share/share';
import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import { UpdatePage } from '../pages/update/update';
import { SettingPage } from '../pages/setting/setting';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { FreetablePage } from '../pages/freetable/freetable';
import { BookingtablePage } from '../pages/bookingtable/bookingtable';
  
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProaddvendorProvider } from '../providers/proaddvendor/proaddvendor';
import { PropurchaseDataProvider } from '../providers/propurchase-data/propurchase-data';
import { ProwaitertablebookingProvider } from '../providers/prowaitertablebooking/prowaitertablebooking';
import { ProwaiterdashboardProvider } from '../providers/prowaiterdashboard/prowaiterdashboard';
import { ProadminbillingProvider } from '../providers/proadminbilling/proadminbilling';
import { ProadminbillingprintProvider } from '../providers/proadminbillingprint/proadminbillingprint';
import { ProadminexpenditureProvider } from '../providers/proadminexpenditure/proadminexpenditure';

@NgModule({
  declarations: [
    MyApp,  
    AboutPage,
    ContactPage,   
    HomePage,
    TabsPage,LoginPage,CreatepdfPage,AdminbillingPage,AdminexpenditurePage,AdminpurchasePage,AdminwinebottelesstockPage,
    KitchendashboardPage,KitchenorderviewPage,WaiterdashboardPage,WaiterorderPage,WaitertableviewPage,AdminaddvendorPage,
    WaitertablebookingPage,WaitertablebookingextraPage,MyprofilePage,SharePage,TermsandconditionsPage,UpdatePage,
    SettingPage,DisclaimerPage,ChangepasswordPage,FreetablePage,BookingtablePage
  ],
  imports: [
    BrowserModule,
HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,LoginPage,CreatepdfPage,AdminbillingPage,AdminexpenditurePage,AdminpurchasePage,AdminwinebottelesstockPage,
    KitchendashboardPage,KitchenorderviewPage,WaiterdashboardPage,WaiterorderPage,WaitertableviewPage,AdminaddvendorPage,
    WaitertablebookingPage,WaitertablebookingextraPage,MyprofilePage,SharePage,TermsandconditionsPage,UpdatePage,
    SettingPage,DisclaimerPage,ChangepasswordPage,FreetablePage,BookingtablePage
  ],
  providers: [
    StatusBar,    
    SplashScreen,
    File,   
    FileOpener,
    CallNumber,
    SocialSharing,
    Transfer,
    Camera,
    FilePath,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProaddvendorProvider,
    PropurchaseDataProvider,
    ProwaitertablebookingProvider,
    ProwaiterdashboardProvider,
    ProadminbillingProvider,
    ProadminbillingprintProvider,
    ProadminexpenditureProvider
  ]
})
export class AppModule {}
