import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommercialRoutingModule } from './commercial-routing.module';
import { CommercialComponent } from '../../commercial.component';
import { HeaderComponent } from '../../components/header/header.component'
import { MainComponent } from '../../components/main/main.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { NavigationComponent } from '../../components/header/navigation/navigation.component'
import { SectionWelcomeComponent } from '../../components/main/section-welcome/section-welcome.component';
import { SectionBusinessInformationComponent } from '../../components/main/section-business-information/section-business-information.component';
import { SectionContactComponent } from '../../components/main/section-contact/section-contact.component';
import { SectionAboutUsComponent } from '../../components/main/section-about-us/section-about-us.component';
import { SectionColdMailingOfferComponent } from '../../components/main/section-cold-mailing-offer/section-cold-mailing-offer.component';
import { SectionLinkedinAutoOfferComponent } from '../../components/main/section-linkedin-auto-offer/section-linkedin-auto-offer.component';
import { SectionMajorComponent } from '../../components/main/section-major/section-major.component';
import { SectionClientsComponent } from '../../components/main/section-clients/section-clients.component';
import { SectionLoginComponent } from '../../components/main/section-login/section-login.component';
import { ClientPragmaGoComponent } from '../../components/main/section-specific-client/client-pragma-go/client-pragma-go.component';
import { ClientPersonnelServiceComponent } from '../../components/main/section-specific-client/client-personnel-service/client-personnel-service.component';
import { ClientArgentumEventComponent } from '../../components/main/section-specific-client/client-argentum-event/client-argentum-event.component';
import { ClientVendoriseComponent } from '../../components/main/section-specific-client/client-vendorise/client-vendorise.component';
import { SectionClientsRollbarComponent } from '../../components/main/section-clients-rollbar/section-clients-rollbar.component';
import { PolityComponent } from '../../components/main/section-privacy-cookies/polity/polity.component';
import { CookiesComponent } from '../../components/main/section-privacy-cookies/cookies/cookies.component';
import { ClientMojoHrComponent } from '../../components/main/section-specific-client/client-mojo-hr/client-mojo-hr.component';
import { ClientEwlComponent } from '../../components/main/section-specific-client/client-ewl/client-ewl.component';
import { ClientInnBenefitsComponent } from '../../components/main/section-specific-client/client-inn-benefits/client-inn-benefits.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SectionSendResetLinkComponent } from '../../components/main/section-send-reset-link/section-send-reset-link.component';
import { SectionWwwTrackingComponent } from '../../components/main/section-www-tracking/section-www-tracking.component';

@NgModule({
  declarations: [
    CommercialComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    NavigationComponent,
    SectionWelcomeComponent,
    SectionBusinessInformationComponent,
    SectionContactComponent,
    SectionAboutUsComponent,
    SectionColdMailingOfferComponent,
    SectionLinkedinAutoOfferComponent,
    SectionMajorComponent,
    SectionClientsComponent,
    SectionLoginComponent,
    ClientPragmaGoComponent,
    ClientPersonnelServiceComponent,
    ClientArgentumEventComponent,
    ClientVendoriseComponent,
    SectionClientsRollbarComponent,
    PolityComponent,
    CookiesComponent,
    ClientMojoHrComponent,
    ClientEwlComponent,
    ClientInnBenefitsComponent,
    SectionSendResetLinkComponent,
    SectionWwwTrackingComponent

  ],
  imports: [
    CommonModule,
    CommercialRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    CommercialComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    NavigationComponent,
    SectionWelcomeComponent,
    SectionBusinessInformationComponent,
    SectionContactComponent,
    SectionAboutUsComponent,
    SectionColdMailingOfferComponent,
    SectionLinkedinAutoOfferComponent,
    SectionMajorComponent,
    SectionClientsComponent,
    SectionLoginComponent,
    ClientPragmaGoComponent,
    ClientPersonnelServiceComponent,
    ClientArgentumEventComponent,
    ClientVendoriseComponent,
    SectionClientsRollbarComponent,
    PolityComponent,
    CookiesComponent,
    ClientMojoHrComponent,
    ClientEwlComponent,
    ClientInnBenefitsComponent,
    SectionWwwTrackingComponent
  
  ]

})
export class CommercialModule { }
