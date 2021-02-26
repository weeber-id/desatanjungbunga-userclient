declare module '*.svg' {
  const content: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

export type BaseElement = {
  id: string;
  image: string;
  name: string;
  short_description: string;
  description: string;
  operation_time: OperationTime;
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
};

export type Lodging = BaseElement;

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
};

export type HandCraft = BaseElement;

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
