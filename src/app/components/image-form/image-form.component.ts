import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { setAllowedExtention } from '../../shared/shared_file';

@Component ({
    selector: 'image-form',
    templateUrl: './image-form.component.html',
    styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit {
  @Input("inputId") inputId='';
  @Input("fileToUpload") set imageFile(res){
    this.fileToUpload=res;
  };
  @Input("logoPath") set imagePath(res){
    this.logoPath=res;
    console.log(res);
    if(!res){
      this.classNameDrag='drag-div-dashed';
    }
  }
  fileToUpload: File = null;
  logoPath: string | ArrayBuffer;
  @Output() afterDelete = new EventEmitter();
  @Output() changeImage = new EventEmitter();
  @Output() setThumbnail = new EventEmitter();
  classNameDrag='drag-div-dashed';
  constructor(
    private _snackBar: MatSnackBar,
    private translate: TranslateService){
  }
  ngOnInit(){
  }
  
  changeBorder(event,isSolid){
    event.preventDefault();
    if(isSolid){
      this.classNameDrag='drag-div-solid';
    }else{
      this.classNameDrag='drag-div-dashed';
    }
  }

  dropFile(event){
    event.preventDefault();
    this.handleFileInput(event.dataTransfer.files);
  }

  handleFileInput(files: FileList) {
    if(files[0]){
      let theFile = files[0];
      let theFileName = theFile.name;
      let extensionName = setAllowedExtention(['jpg', 'jpeg', 'png']);
      if(!extensionName.exec(theFileName)){
        this.openSnackBar(this.translate.instant('message.not_match_extension'), this.translate.instant('message.dismiss'));
        this.classNameDrag='drag-div-dashed';
      }else if(Math.round((theFile.size||0)/(1024))>1024){
        this.openSnackBar(this.translate.instant('message.file_size_error'), this.translate.instant('message.dismiss'));
        this.classNameDrag='drag-div-dashed';
      }else{
        let img = new Image();
        let reader = new FileReader();
        reader.onload = (e) => {
          // this.logoPath=e.target['result'];
          // this.fileToUpload = theFile;
          this.changeImage.emit({
            imagePath: e.target['result'],
            theImage: theFile
          })
        }
        img.src = (window.URL).createObjectURL(theFile);
        img.onload = () => {
          reader.readAsDataURL(theFile);
        }
      }
    }
  }

  replaceImage(){
    document.getElementById(this.inputId).click();
  }

  deleteImage(){
    this.afterDelete.emit(
      {
        theFunc: res=>{
          if(res){
            this.fileToUpload=res.theFile;
            this.logoPath=res.thePath;
          }else{
            this.fileToUpload=null;
            this.logoPath=null;
            this.classNameDrag='drag-div-dashed';
          }
        }
      }
    )
  }

  actionButtons(isHide){
    if(isHide){
      document.getElementById('option-'+this.inputId).style.display = 'none';
    }else{
      document.getElementById('option-'+this.inputId).style.display = 'flex';
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
        duration: 4000,
        horizontalPosition: "right",
        verticalPosition: "bottom"
    });
  }
}