import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimecomponentsModule } from './primecomponents.module';
import { CuotaMortuariaComponent } from './views/cuota-mortuaria/cuota-mortuaria.component';
import { AppErrorComponent } from './views/shared/app.error.component';
import { AppAccessdeniedComponent } from './views/shared/app.accessdenied.component';
import { AppNotfoundComponent } from './views/shared/app.notfound.component';
import { PagoCuotaMortuariaComponent } from './views/pago-cuota-mortuaria/pago-cuota-mortuaria.component';
import { MessageService } from 'primeng/api';
import { AppConfig } from './services/appconfig';
import { DirectiveModule } from './utilities/directivas.module';
import { FormatRutDirective } from './utilities/format-rut.directive';
import { FormatRutPipe } from './utilities/format-rut.pipe';
import { JsBarcodeModule } from 'ngx-jsbarcode/lib';
import { GarantiaEstatalComponent } from './views/garantia-estatal/garantia-estatal.component';
import { IngresoPoderesComponent } from './views/ingreso-poderes/ingreso-poderes.component';
import { RetencionJudicialComponent } from './views/retencion-judicial/retencion-judicial.component';

export function initializeApp(appConfig: AppConfig) {
	return () => appConfig.load();
}

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		PrimecomponentsModule,
		ReactiveFormsModule,
		DirectiveModule.forRoot(),
		JsBarcodeModule,
	],
	declarations: [
		AppComponent,
		CuotaMortuariaComponent,
		AppErrorComponent,
		AppAccessdeniedComponent,
		AppNotfoundComponent,
		PagoCuotaMortuariaComponent,
		GarantiaEstatalComponent,
		IngresoPoderesComponent,
		RetencionJudicialComponent,
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		MessageService,
		FormatRutDirective,
		FormatRutPipe,
		DatePipe,
		AppConfig,
		{
			provide: APP_INITIALIZER,
			useFactory: initializeApp,
			deps: [AppConfig],
			multi: true,
		},
	],
	bootstrap: [AppComponent],
	exports: [PrimecomponentsModule],
})
export class AppModule {}
