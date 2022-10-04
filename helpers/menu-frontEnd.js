const getMenuFronEnd = (role = 'USER_ROLE') => {
    
    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          subMenu: [
            {
              titulo: 'Main',
              url: '/'
            },
            {
              titulo: 'Progress',
              url: 'progress'
            },
            {
              titulo: 'Gráfica',
              url: 'grafica1'
            },
            {
              titulo: 'Promesas',
              url: 'promesas'
            },
            {
              titulo: 'Rxjs',
              url: 'rxjs'
            }
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          subMenu: [
            /* {
              titulo: 'Usuarios',
              url: 'usuarios'
            }, */
            {
              titulo: 'Medicos',
              url: 'medicos'
            },
            {
              titulo: 'Hospitales',
              url: 'hospitales'
            }
          ]
        }
      ];
    
      if(role === 'ADMIN_ROLE'){

        menu[1].subMenu.unshift({titulo: 'Usuarios', url: 'usuarios'});
      }

      return menu;
}


  module.exports = {
    getMenuFronEnd
};