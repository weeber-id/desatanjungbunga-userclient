export type BaseElement = {
  id: string;
  image: string;
  name: string;
  short_description: string;
  description: string;
  slug: string;
};

export type ApiResponse<T> = {
  meta: {
    status: 'ok' | 'error';
    message: string;
    code: number;
  };
  data: T;
};

export type Travel = BaseElement & {
  updatedAt: string;
  price: string;
  operation_time: OperationTimeState;
};

export type Lodging = BaseElement & {
  price: {
    value: number;
    unit: string;
  };
  links: {
    name: string;
    link: string;
  }[];
  operation_time: OperationTimeState;
  facilities: {
    icon: string;
    name: string;
    id: string;
  }[];
};

export type Commodity = BaseElement & {
  price: {
    start: string;
    end: string;
    unit: string;
  };
  links: {
    name: string;
    link: string;
  }[];
  operation_time: OperationTimeState;
};

export type HandCraft = BaseElement & {
  price: number;
  links: {
    name: string;
    link: string;
  }[];
  operation_time: OperationTimeState;
};

export type OperationTimeState = {
  monday: {
    open: boolean;
    from: string;
    to: string;
  };
  tuesday: {
    open: boolean;
    from: string;
    to: string;
  };
  wednesday: {
    open: boolean;
    from: string;
    to: string;
  };
  thursday: {
    open: boolean;
    from: string;
    to: string;
  };
  friday: {
    open: boolean;
    from: string;
    to: string;
  };
  saturday: {
    open: boolean;
    from: string;
    to: string;
  };
  sunday: {
    open: boolean;
    from: string;
    to: string;
  };
};
