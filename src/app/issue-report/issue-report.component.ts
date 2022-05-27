import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {

  @Output() formClose  = new EventEmitter() ;
  issueForm: FormGroup | undefined;
  suggestions: Issue[]= [];

  constructor(private fb: FormBuilder, private issueService: IssuesService) { }

  ngOnInit(): void {
    this.issueForm = this.fb.group({
      title: ['',  [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(250)]],
      priority: ['',[Validators.required]],
      type: ['',[Validators.required]]
    });

    this.title?.valueChanges.pipe(
      debounceTime(1000),
      tap(title => this.suggestions = this.issueService.getSuggestion(title))
    ).subscribe()
  }

  get title() {
    return this.issueForm?.controls['title']
  }
  addIssue(){
    this.issueService.createIssue(this.issueForm?.value)
    this.formClose.emit();
  }
}
