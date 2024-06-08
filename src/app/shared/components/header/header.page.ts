import { AfterViewInit, Component, Input } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { IUser } from '../../interfaces/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements AfterViewInit {
  @Input() title = '';
  isLogged = false;
  session: IUser | undefined = undefined;

  constructor(private sessionService: SessionService) {}

  ngAfterViewInit(): void {
    this.sessionService.session$.subscribe((data) => {
      this.session = data;
      this.isLogged = this.session.user !== '';
    });
  }
}
