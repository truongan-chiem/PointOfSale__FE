import Swal from 'sweetalert2'
import './Notification.scss'


export const Notificationz = (title,type = 'success') =>{
  NotificationToast.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title: title,
  })
}

const NotificationToast = Swal.mixin({
  showConfirmButton: false,
  customClass: {
    popup: 'swal_container_popup',
    title: 'swal_title_popup',
  },
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})