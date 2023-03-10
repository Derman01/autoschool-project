import {FC} from 'react';
import './styles/Button.scss';
import {Icon} from './Icon';
import {IconName} from './Interface';
import {ComponentOptions} from 'shared/types';
import {classNames} from 'shared/lib/helpers';

export interface ButtonOptions extends ComponentOptions {
   title?: string;
   icon?: IconName;
   iconSize?: 'm' | 's'
   onClick?: () => void;
   viewMode?: 'icon' | 'default'
}


export const Button: FC<ButtonOptions> = (options) => {
   const {
      className,
      icon,
      title,
      onClick,
      viewMode = 'default',
       iconSize
   } = options;

   return (
       <button className={classNames(['button', className])}
               title={title}
               onClick={onClick}
       >
            <span className='button__container'>
					{icon && <Icon size={iconSize} icon={icon}/>}
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
