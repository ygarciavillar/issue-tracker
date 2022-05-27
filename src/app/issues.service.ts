import { Injectable } from '@angular/core';
import { Issue } from './issue';
import { issues } from '../assets/mock-issues';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issues: Issue[] = issues

  constructor() { }

  getPendingIssues() {
    return this.issues.filter( issue => !issue.completed);
  }

  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
   }

  completeIssue(issue: Issue) {
    const completedIssue : Issue = {
      ...issue,
      completed: new Date()
    }
    const index = this.issues.findIndex(i => i ===  issue);
    this.issues[index] = completedIssue
  }

  getSuggestion(title: string): Issue[] {
    if(title.length > 3) {
      return this.issues.filter(i => i.title.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) !== -1);
    }
    return []
  }
}
