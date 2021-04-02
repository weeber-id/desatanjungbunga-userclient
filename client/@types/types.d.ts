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
  culinary_details?: Commodity[];
  lodging_details?: Lodging[];
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

export type Discussion = {
  body: string;
  content_id: string;
  content_name: 'article' | 'travel' | 'culinary' | 'handcraft' | 'lodging';
  created_at: string;
  email: string;
  id: string;
  name: string;
  questions: Discussion[] | null;
};

export type Article = {
  id: string;
  author: string;
  body: string;
  created_at: string;
  recommendation: boolean;
  slug: string;
  title: string;
  updated_at: string;
  active: boolean;
  image_cover: string;
  author_detail: {
    id: string;
    profile_picture: string;
  };
};

export type About = {
  id: string;
  name: string;
  profile_picture: string;
  position: string;
  body: string;
};
