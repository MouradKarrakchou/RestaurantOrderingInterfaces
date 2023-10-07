import {Component, OnInit,EventEmitter, Output} from '@angular/core';
import {SwitchService} from "../../services/switch.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  category: string = "ALL";

  @Output() categoryEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private swicthService: SwitchService,
              private router: Router) { }

  ngOnInit(): void {
  }

  emitCategoryEvent(category: string) {
    this.category = category;
    this.categoryEvent.emit(category);
  }

  switchBFF() {
    this.swicthService.switchBFF();
  }

  getBFF(): boolean {
    return this.swicthService.isBFF();
  }

  reloadPage() {
    this.router.navigate(['/idle'])
  }

  protected readonly print = print;
}
