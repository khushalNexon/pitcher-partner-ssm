import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'clients',
    path: 'client',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'employees',
  //   path: 'employees',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'share options',
  //   path: 'shareoptions',
  //   icon: icon('ic_blog'),
  // },
];

export default navConfig;
