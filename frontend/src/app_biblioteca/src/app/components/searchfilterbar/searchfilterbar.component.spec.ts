import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchfilterbarComponent } from './searchfilterbar.component';

describe('SearchfilterbarComponent', () => {
    let component: SearchfilterbarComponent;
    let fixture: ComponentFixture<SearchfilterbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [SearchfilterbarComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SearchfilterbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
