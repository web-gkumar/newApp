import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Crud } from '../../shared/services/crud';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-profile',
  imports: [MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  profileForm!: FormGroup;
  user: any = {};
  token: any;
  crops: any[] = [];

  constructor(
    private _auth: Auth,
    private _crudService: Crud,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('profile') || '{}');
    this.token = localStorage.getItem('token');
    this.profileForm = this.fb.group({
      mobile: [this.user?.mobile || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Village: [this.user?.Village || '', Validators.required],
      distic: [this.user?.distic || '', Validators.required],
      state: [this.user?.state || '', Validators.required],
      pincode: [this.user?.pincode || '', Validators.required],
      address: [this.user?.address || '', Validators.required],
      country: [this.user?.country || '', Validators.required]
    });
  }


  submitProfile() {
    if (this.profileForm.invalid) return;
    this._auth.updateProfile(this.profileForm.value).subscribe((res: any) => {
      this.user = res.user;
      localStorage.setItem('profile', JSON.stringify(res.user));
      alert('Profile updated successfully');
      this.user = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile') || '{}') : {};
    });
  }



  loadOrders() {
    if (this.user._id) {
      this._crudService.getOrders(this.user._id).subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem("Posted-data", JSON.stringify(res.data))
          this.crops = res.data;
        }
      });
    }
  }

  updateitem(c: any) {
    this.router.navigate(['../update-post', c._id], { relativeTo: this.route });
  }

  removeItem(c: any) {
    if (confirm("Do you really want to delete this item?")) {
      this._crudService.deleteItem(c._id).subscribe(data => {
        this.loadOrders();
      })
    }
  }



}
