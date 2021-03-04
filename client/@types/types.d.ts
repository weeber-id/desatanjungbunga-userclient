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
  operation_time: OperationTime;
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
  operation_time: string;
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
  operation_time: OperationTime;
};

export type HandCraft = BaseElement & {
  price: number;
  links: {
    name: string;
    link: string;
  }[];
  operation_time: OperationTime;
};

type OperationTime = {
  from: {
    day: string;
    time: string;
  };
  to: {
    day: string;
    time: string;
  };
};
