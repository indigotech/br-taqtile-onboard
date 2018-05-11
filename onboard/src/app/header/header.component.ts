import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../api/LoginService';
import { Globals } from '../globals';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginService, private globals: Globals) {

  }

  ngOnInit() { 
  }

}
