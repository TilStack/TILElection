import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Region } from 'src/app/models/Region.models';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-Region',
  templateUrl: './Region.component.html',
  styleUrls: ['./Region.component.css'],
})
export class RegionComponent implements OnInit {
  success!: string;
  public formRegion!: FormGroup;
  public erreur!: string;
  regions: Region[] = [];
  region!: Region;

  constructor(
    public fb: FormBuilder,
    private regionService: RegionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formRegion = this.fb.group({
      label: ['', Validators.required],
    });

    this.chargementRegion();
  }

  // récupration de l'observable (un tableau de région) émis par le service
  private chargementRegion() {
    this.regionService.loadRegion().subscribe(
      (data: Region[]) => {
        this.regions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    const r = new Region();
    r.label = this.formRegion.value.label;
    this.regionService.insertRegion(r).subscribe(
      (data) => {
        console.log(data);
        this.formRegion.reset();
        // recharger la liste des régions après insertion réussie
        this.chargementRegion();
        this.affichageMessage();
      },
      (error) => {
        console.log(error);
        this.erreur = "Erreur lors de l'insertion de la région.";
      }
    );
  }

  private affichageMessage() {
    setTimeout(() => {
      this.success = 'Insertion réussie';
      setTimeout(() => {
        this.success = '';
      }, 2000);
    }, 3000);
  }

  gotoEditRegion(region: Region) {
    this.router.navigate(['/regions', region.id]);
  }

  deleteRegion(id: number) {
    this.regionService.deleteRegion(id).subscribe(
      (data) => {
        console.log(data);
        // Supprimer la région de la liste
        this.regions = this.regions.filter((r) => r.id !== id);
      },
      (error) => {
        console.log(error);
        this.erreur = 'Erreur lors de la suppression de la région.';
      }
    );
  }
}
