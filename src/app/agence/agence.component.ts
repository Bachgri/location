import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../auth.service';
import { Interface } from '../models/Interfaces';
import { Agence } from '../models/Agence'; 
import { Router } from '@angular/router';
import { Voiture } from '../models/VoitreModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css']
})
export class AgenceComponent implements OnInit {
  private timerInterval: any;

  token: String|null = "";
  selectedFile: any; 
  open = false;
  dropped = false;
  interfaces: Interface[] = [];

  editedAgence!: Agence ;
  deletedAgence!:Agence;  
  addedAgence:Agence= {
    id: null,
    name: '',
    adresse: '',
    phone: '',
    email: '',
    owner: null,
    ville: ''
  };
  addVoiture: Voiture={
    id: null,
    marque: '',
    model: '',
    anfab: '',
    categorie: '',
    prix: null,
    disponible: true,
    agence: null,
    imgurl: ''
  };
  voitures:Voiture[] = [];
  editedVoiture!: Voiture;
  deletedVoiture!: Voiture;
  agences: Agence[] = [];
  voitureCMD: string = 'LIST'
  constructor(private service: AuthService, private router: Router){}
  ngOnInit(): void {
    this.token = sessionStorage.getItem("token")
    this.service.loadInterfaces(sessionStorage.getItem("userid")).subscribe((d)=>{
        console.log(
          d
        );
        this.interfaces=d;
    },
    (err)=>{
      this.router.navigate(['/login'])
    })
    this.loadAgences()
    
  }
  loadAgences() {
    this.service.loadAgences().subscribe((d)=>{
      this.agences = d;
      console.log('====================================');
      console.log(d);
      console.log('====================================');
    },
    (err)=>{
      console.error(err);
      
    })
  }
  onOpenModal(client:any, mode: any){
    const container = document.getElementById("myContainer");
    const btn = document.createElement('button');
    console.log('====================================');
    console.log(mode);
    console.log('====================================');
    btn.type='button';
    btn.style.display='none';
    btn.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      btn.setAttribute('data-target', '#addAgenceModal');
    }
    if(mode === 'edit'){
      this.editedAgence=client;
      let intt: any[] = []; 
      btn.setAttribute('data-target', '#editAgenceModal');
      this.loadVoitures()
    }
    if(mode === 'delete'){
      this.deletedAgence=client;
      btn.setAttribute('data-target', '#deleteAgenceModal');
    }
    container?.appendChild(btn); 
    btn.click();
  }
  openMenu(){
    this.open=!this.open
  }
  dropdown(){
    this.dropped = !this.dropped;
  }
  onAddAgence(form: any){
    console.log('====================================');
    console.log(this.addedAgence);
    this.addedAgence.owner = {'id': sessionStorage.getItem("userid")}
    console.log('====================================');
    this.service.addAgence(this.addedAgence).subscribe((res)=>{
      this.addedAgence = {
        id: null,
        name: '',
        adresse: '',
        phone: '',
        email: '',
        owner: null,
        ville:''
      };
      document.getElementById('closeAddAgence')?.click();
      this.loadAgences()
      this.showAlert("Agence added succefully ")
    })  
  }
  onEditeAgence(form: any){
    console.log(this.editedAgence);
    this.service.editeAgence(this.editedAgence).subscribe(d=>{
      this.loadAgences();
    })

  }
  onDeleteAgence(form : any){
    this.service.deleteAgence(form).subscribe((f)=>{
      this.loadAgences();
      document.getElementById("clodeDeleteAgence")?.click();
      this.showAlert("Agence deleted succefully ")
    }) 
  }
  AddVoitureToAgence(){
    console.log('====================================');
    this.addVoiture.agence = {'id': this.editedAgence.id}
    console.log(this.addVoiture);
    console.log('====================================');
    this.service.addVoitures(this.addVoiture).subscribe(async (d)=>{
      this.resetVeh()
      console.log("d.id = "+d.id);
      await this.uploadFile(d.id);
      this.loadVoitures()
    })
  }
  resetVeh(){
    this.addVoiture={
      id: null,
      marque: '',
      model: '',
      anfab: '',
      categorie: '',
      prix: null,
      disponible: true,
      agence: null,
      imgurl: ''
    };
    this.voitures = []
  }
  loadVoitures(){
    this.service.loadVoitures(this.editedAgence.id).subscribe((d)=>{
      this.voitures = d;
    })
  }
  changeCMDV(cmd:string){
    this.voitureCMD = cmd;
  }
  onOpenModalV(voiture:any, mode: any){
    const container = document.getElementById("myContainer");
    const btn = document.createElement('button');
    console.log('====================================');
    console.log(mode);
    console.log('====================================');
    btn.type='button';
    btn.style.display='none';
    btn.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      btn.setAttribute('data-target', '#addVoitureModal');
    }
    if(mode === 'edit'){
      this.editedAgence=voiture;
      let intt: any[] = []; 
      btn.setAttribute('data-target', '#editVoitureModal');
      this.loadVoitures()
    }
    if(mode === 'delete'){
      this.deletedVoiture=voiture;
      btn.setAttribute('data-target', '#deleteVoitureModal');
    }
    container?.appendChild(btn); 
    btn.click();
  }
  onDeleteVoiture(voiture: any){
    console.log('====================================');
    console.log(this.deletedVoiture.id);
    console.log('====================================');
    this.service.deleteVoiture(this.deletedVoiture.id).subscribe((d)=>{
      this.loadVoitures();
      document.getElementById("clodeDeleteVoiture")?.click();
    })
  }
  searchAgence(){

    const container = document.getElementById('agencesContainer');
    const myAgences = container?.getElementsByClassName('agence');
    const query = (document.getElementById('searchA') as HTMLInputElement).value.toLowerCase();
    console.log(query);
    console.log('====================================');
    console.log(myAgences ? myAgences.length : 0);
    console.log('====================================');
    for (let i = 0; myAgences && i < myAgences.length; i++) {
      const element = myAgences[i] as HTMLElement;
      const a = element.getElementsByTagName('a')[0];
      const spanName = a.getElementsByTagName('span')[1] as HTMLElement;
      console.log('====================================');
      console.log(spanName.textContent);
      console.log('====================================');
      const spanNameText = spanName.textContent ? spanName.textContent.toLowerCase() : '';
      if (spanNameText.indexOf(query) === -1) {
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    }
  }
  
  @ViewChildren('loading') elem!:  QueryList<ElementRef>;
  cancel(){
    this.selectedFile=undefined
    this.elem.first.nativeElement.setAttribute("style", "visibility:hidden;")
        

  }
  

  

  async uploadFile(id:any): Promise<void> {
    // if (this.selectedFile) {
      let formData: FormData = new FormData();
      
      formData.append('file', this.selectedFile);
      formData.append('recid', id);
      console.log('====================================');
      console.log(formData.get('recid'));
      console.log('====================================');
      this.service.uploadImg(formData).subscribe((res)=>{
        console.log('response : ', res);
        this.loadVoitures();
      })
      
    // }
  }
  onFileSelected(event:any) {  
    if (event && event.target.files.length > 0) { 
      this.selectedFile =  event.target.files[0]; 
      console.log(this.selectedFile);
    } 
  }
  showAlert(message: any) {
    Swal.fire({
      title: message,
      html: '',
      timer: 2000,
      timerProgressBar: false,
      didOpen: () => {
        //Swal.showLoading();
        const b: any = Swal.getHtmlContainer()?.querySelector('b');
        this.timerInterval = setInterval(() => {
          if (b) {
            b.textContent = Swal.getTimerLeft()?.toString()
          }
        }, 100);
      },
      willClose: () => {
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        
      }
    });
  }
}
