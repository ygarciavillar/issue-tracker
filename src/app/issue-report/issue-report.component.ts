import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  @Output() formClose  = new EventEmitter() ;
  issueForm: FormGroup | undefined

  constructor(private fb: FormBuilder, private issueService: IssuesService) { }

  ngOnInit(): void {
    this.issueForm = this.fb.group({
      title: ['',  [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(250)]],
      priority: ['',[Validators.required]],
      type: ['',[Validators.required]]
    });
  }

  addIssue(){
    this.issueService.createIssue(this.issueForm?.value)
    this.formClose.emit();
  }
}
