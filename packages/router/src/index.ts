interface IRouteNode<TParams = any> {
  path: string;
  params: TParams;
  children?: IRouteMap;
}

interface IRouteMap {
  [name: string]: IRouteNode;
}

interface IRouteState<TParams> {
  activated: boolean;
  params?: TParams;
}

type Routes<T extends IRouteMap> = {
  [P in keyof T]: T[P]['children'] extends never
    ? IRouteState<T[P]['params']>
    : Routes<T[P]['children']> & IRouteState<T[P]['params']>;
};

const createRoutes = <T extends IRouteMap>(input: T) => (state: any): Routes<T> => {
  return ({
    input,
    state,
  } as any) as Routes<T>;
};
interface IMyParams {
  blah: string;
}

const route = <TParams = {}>() => <TChildren = {}>(path: string, children?: TChildren) => ({
  path,
  params: (undefined as any) as TParams,
  children,
});

const routes = createRoutes({
  LOGIN: route<IMyParams>()('/login', {
    REGISTER: route()('/register', {
      SUBMITTED: route<{ id: string }>()('/submitted'),
    }),
  }),
});

routes({}).LOGIN.REGISTER.activated;

routes({}).LOGIN.REGISTER.SUBMITTED.params;
