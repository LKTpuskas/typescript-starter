import clsx from 'clsx';
import { CSSProperties, PropsWithChildren } from 'react';

export interface ComponentLoaderProps {
  style?: CSSProperties;
  isLoading?: boolean;
  loadingText?: string;
  loaderRole?: string;
}
export function ComponentLoader({
  children,
  isLoading = false,
  loaderRole = 'loading-spinner',
  style
}: PropsWithChildren<ComponentLoaderProps>) {
  return (
    <div className={clsx({ 'component-loader': isLoading })} style={style}>
      {isLoading ? (
        <div role={loaderRole} className="component-loader-spinner-wrapper">
          {/* add spinner component here */} Loading
        </div>
      ) : null}
      {children}
    </div>
  );
}