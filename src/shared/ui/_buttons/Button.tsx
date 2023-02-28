import React, {FC} from 'react';
import {Icon} from './Icon';
import {ComponentOptions} from 'shared/types';
import {classNames} from 'shared/lib/helpers';
import './styles/Button.scss';

export interface ButtonOptions extends ComponentOptions {
   title?: string;
   icon?: string;
   onClick?: () => void;
   viewMode?: 'icon' | 'default'
}


export const Button: FC<ButtonOptions> = (options) => {
   const {
      className,
      icon,
      title,
      onClick,
      viewMode = 'default'
   } = options;

   return (
       <button className={classNames(['button', className])}
               title={title}
               onClick={onClick}
       >
            <span className='button__container'>
					{icon && <Icon icon={icon}/>}
               {
                   title && viewMode === 'default' &&
						<span className='button__text'>
							{title}
						</span>
               }
            </span>
       </button>
   );
};
