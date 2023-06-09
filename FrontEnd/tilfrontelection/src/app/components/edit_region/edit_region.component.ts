import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Region } from 'src/app/models/Region.models';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-edit_region',
  templateUrl: './edit_region.component.html',
  styleUrls: ['./edit_region.component.css']
})
export class Edit_regionComponent implements OnInit {
  success = '';
  regionForm!: FormGroup;
  region: any;
  regions: Region[] = [];

  constructor(
    private regionService: RegionService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.regionForm = this.fb.group({
      label: ['', Validators.required],
      id: [],
    });

    const regionId: string | null = this.route.snapshot.paramMap.get('id');

    this.regionService.loadRegion().subscribe((data: Region[]) => {
      this.regions = data;


      if (regionId) {
        this.region = this.regions.find(
          (region: Region) => region.id == +regionId
        );
        console.log(this.region);
      }
    });
  }

  // Méthode de mise a jour
  miseAjourRegion(): void {
    this.regionService.updateRegion(this.region?.id, this.region).subscribe(
      (response) => {
        console.log(response);
        this.success = 'région mise a jour';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
