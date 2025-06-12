import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BrewInsightsChatComponent } from './brew-insights-chat/brew-insights-chat.component';
import { CoffeeMenuComponent } from './coffee-menu/coffee-menu.component';
import { QuoteOfTheDayComponent } from './quote-of-the-day/quote-of-the-day.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'chat', component: BrewInsightsChatComponent },
  { path: 'menu', component: CoffeeMenuComponent },
  { path: 'quote', component: QuoteOfTheDayComponent },
  { path: 'settings', component: SettingsComponent },
];
