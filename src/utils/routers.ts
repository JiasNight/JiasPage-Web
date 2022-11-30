import { h } from 'vue';
import { NIcon } from 'naive-ui';

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export function creatMenuOption(routes: any) {
  const res: Array<any> = [];
  routes.forEach((route: any) => {
    if (route.hidden) {
      return;
    }
    let newRoute: any;
    if (route.children && route.children.length === 1) {
      const { name, label, icon } = route.children[0];
      newRoute = { key: name, name, label };
      if (icon) {
        newRoute.icon = renderIcon(icon);
      }
    } else {
      const { name, label, icon } = route;
      newRoute = { key: name, name, label };
      if (icon) {
        newRoute.icon = renderIcon(icon);
      }
      if (route.children) {
        const children = creatMenuOption(route.children);
        newRoute.children = children;
      }
    }
    res.push(newRoute);
  });
  return res;
}
