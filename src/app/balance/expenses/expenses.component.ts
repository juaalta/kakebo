import { Component, OnInit } from "@angular/core";
import {
	JournalEntry,
	expenseInitialState,
	journalEntriesInitialState
} from "../state/models/journal-entry.model";
import { expenseCategories } from "../state/models/expenseCategories.model";

@Component({
	selector: "kab-expenses",
	templateUrl: "./expenses.component.html",
	styles: []
})
export class ExpensesComponent implements OnInit {
	public expenseCategories = expenseCategories;
	public numberOfExpenses = 0;
	public expense: JournalEntry = expenseInitialState;
	public expenses: JournalEntry[] = journalEntriesInitialState;
	public title = "New Expense";

	constructor() {}

	ngOnInit() {}

	public saveExpense() {
		const clonedJournalEntry = { ...this.expense };
		this.expenses.push(clonedJournalEntry);
		this.numberOfExpenses = this.expenses.length;
		this.expense = expenseInitialState;
	}
	public deleteExpense(journalEntry: JournalEntry) {
		const index = this.expenses.indexOf(journalEntry);
		this.expenses.splice(index, 1);
		this.numberOfExpenses = this.expenses.length;
	}
}
