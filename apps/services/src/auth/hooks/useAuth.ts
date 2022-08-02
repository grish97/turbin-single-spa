import { useState } from "react";
import { BehaviorSubject } from "rxjs";
import { IUserStore, authSubject$, initialState } from "store/authSubject";

interface IUseObservable {
  observable$: BehaviorSubject<IUserStore>;
  next: (state: Partial<IUserStore>) => void;
  logout: () => void;
  authState: IUserStore;
}

export const useAuth = () => {
  const [observable$] = useState<IUseObservable["observable$"]>(authSubject$);

  const next: IUseObservable["next"] = (state: Partial<IUserStore>) => {
    observable$.next({...initialState, ...state})
  };

  const logout = () => {
    observable$.next({
      user: null,
      persist: false
    });
  };

  return { observable$, next, logout, authState: observable$.getValue() };
};