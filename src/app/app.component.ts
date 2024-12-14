import { Component } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isNavbarVisible: boolean = true;
  selectedRole: string = 'client';  // Default to 'client'
  isSidebarOpen = true; 
  isSidebarHovered = false;
username:any
firstname:any


  currentRoute: string | undefined;
  pageWrapperClass: string = 'page-wrapper';

   selectedOption: string = ''
   
  isAuthenticated = false;
  navbarclass: string='navbar-class';
  navclass: string='navbar';
 

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}



  updatePageWrapperClass() {
    if (this.currentRoute === '/login' || this.currentRoute === '/ice-dashboard' ) {
      this.pageWrapperClass = 'page-wrapper';
      this.navclass='navbar'
    } else if(this.currentRoute === '/image-status'){
      this.pageWrapperClass = 'page-wrapper2';
     this.navclass='navbar2'
    }else {
      this.pageWrapperClass = 'page-wrapper';
      this.navclass='navbar2'
    }
  }

  updateNavbarclass(){
    if (this.currentRoute==='/image-status') {
      this.navbarclass = 'navbar-class2';
    } else {
      this.navbarclass = 'navbar-class2';
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  isActiveLink(link: string): boolean {
    return this.router.url === link;
  }

   ngOnInit(): void {
    this.checkAuthentication();
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
    const storedRole = localStorage.getItem('selectedRole');
    if (storedRole) {
      this.selectedRole = storedRole;
    }

    let user = localStorage.getItem("user");

    if (user) {
      try {
        const userObject = JSON.parse(user); // Parse the JSON string into an object
        this.firstname = userObject.firstname; // Access the firstname property
        this.username = userObject.email; // Access the firstname property
        
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }



    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
      this.updatePageWrapperClass();
    this.updateNavbarclass()
    });
  
  }

  checkRoute(): void {
    const currentRoute = this.router.url;
    this.isNavbarVisible = currentRoute !== '/ice-dashboard' ;
  }

  checkAuthentication(): void {
    const user = localStorage.getItem('user');
    if(user){
      const userstr = JSON.parse(user);
      this.selectedOption = userstr.selectedOption || ''; 
    }
  
if(!user){
this.isAuthenticated=false;
}else{
  this.isAuthenticated=true
}

}

logout(): void {
  localStorage.removeItem('user');

  localStorage.removeItem('userDetails');
  localStorage.removeItem('forms');
  localStorage.removeItem("county")
  localStorage.removeItem("userRole")
  localStorage.removeItem("doctype")
  localStorage.removeItem("previousCounty")
  localStorage.removeItem("previousState")
  this.isAuthenticated = false;
  this.router.navigate(['/login']);
}

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

getSidebarStyle() {

  return {
    width: this.isSidebarOpen ? '240px' : '0px'
  };
}

getPageWrapperStyle() {
  // Adjust styles only for 'page-wrapper', leave 'page-wrapper2' as is
  if (this.pageWrapperClass === 'page-wrapper2') {
    return {
      marginLeft: this.isSidebarOpen ? '240px' : '0px',
      width: this.isSidebarOpen ? 'calc(100% - 240px)' : 'calc(100% - 0px)'
    };
  }
  // No additional styles for 'page-wrapper2', default styles apply
  return {};
}
getNavbarStyle() {
  // Adjust styles only for 'page-wrapper', leave 'page-wrapper2' as is
  if (this.pageWrapperClass === 'page-wrapper2') {
    return {
      left: this.isSidebarOpen ? '240px' : '0px',
      width: this.isSidebarOpen ? 'calc(100% - 240px)' : 'calc(100% - 0px)'
    };
  }
  // No additional styles for 'page-wrapper2', default styles apply
  return {};
}


onSidebarMouseEnter() {
  this.isSidebarHovered = true;
  this.updateBodyClass()
}

onSidebarMouseLeave() {
  this.isSidebarHovered = false;
  this.updateBodyClass()
}

updateBodyClass() {
  const body = document.body;
  if (this.isSidebarHovered||this.isSidebarOpen) {
    body.classList.add('open-sidebar-folded');
    body.classList.remove('sidebar-folded');
  } else {
    body.classList.add('sidebar-folded');
    body.classList.remove('open-sidebar-folded');
  }
}


}
