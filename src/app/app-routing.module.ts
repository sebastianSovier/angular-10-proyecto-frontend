import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppNotfoundComponent } from './views/shared/app.notfound.component';
import { AppErrorComponent } from './views/shared/app.error.component';
import { AppAccessdeniedComponent } from './views/shared/app.accessdenied.component';
import { CuotaMortuariaComponent } from './views/cuota-mortuaria/cuota-mortuaria.component';
import { PagoCuotaMortuariaComponent } from './views/pago-cuota-mortuaria/pago-cuota-mortuaria.component';
import { GarantiaEstatalComponent } from './views/garantia-estatal/garantia-estatal.component';
import { IngresoPoderesComponent } from './views/ingreso-poderes/ingreso-poderes.component';
import { RetencionJudicialComponent } from './views/retencion-judicial/retencion-judicial.component';

const routes: Routes = [
	{ path: '', component: CuotaMortuariaComponent },
	{ path: 'pago-cuota-mortuaria', component: PagoCuotaMortuariaComponent },
	{ path: 'garantia-estatal', component: GarantiaEstatalComponent },
	{ path: 'ingreso-poderes', component: IngresoPoderesComponent },
	{ path: 'retencion-judicial', component: RetencionJudicialComponent },
	{ path: 'error', component: AppErrorComponent },
	{ path: 'access', component: AppAccessdeniedComponent },
	{ path: 'notfound', component: AppNotfoundComponent },
	{ path: '', pathMatch: 'full', redirectTo: '' },
	// cambiar
	{ path: '**', redirectTo: '/notfound' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
