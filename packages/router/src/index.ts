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
    : Routes<NonNullable<T[P]['children']>> & IRouteState<T[P]['params']>;
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
      CANCELLED: route<{}>()('/cancelled'),
    }),
  }),
});

routes({}).LOGIN.REGISTER;

routes({}).LOGIN.REGISTER.SUBMITTED.params;
