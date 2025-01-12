import React, { FC } from 'react';
import s from './quantity.module.css';
import cn from 'clsx';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LoadingDots from '@/components/ui/LoadingDots'
export interface QuantityProps {
  value: number;
  increase: () => any;
  decrease: () => any;
  handleRemove: React.MouseEventHandler<HTMLButtonElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  max?: number;
  disabled?: boolean;
  removing: boolean;
  increasing: boolean;
  decreasing: boolean;
}

const Quantity: FC<QuantityProps> = ({
  disabled,
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  removing,
  increasing,
  decreasing,
  max = 100
}) => {
  return (
    <div className="flex h-9 flex-row">
      <button className={s.actions} onClick={handleRemove} disabled={disabled}>
        {removing ? <LoadingDots className="bg-black w-1 h-1" /> : <XMarkIcon width={20} height={20} />}
      </button>
      <label className="ml-2 w-full">
        <input
          className={s.input}
          onChange={(e) => (Number(e.target.value) < max + 1 ? handleChange(e) : () => {})}
          value={value}
          type="number"
          max={max}
          min="0"
          readOnly
        />
      </label>
      <button
        type="button"
        onClick={decrease}
        className={s.actions}
        // style={{ marginLeft: '-1px' }}
        disabled={value <= 1 || disabled}
      >
        {decreasing ? <LoadingDots className="bg-black w-1 h-1" /> : <MinusIcon width={18} height={18} />}
      </button>
      <button
        type="button"
        onClick={increase}
        className={cn(s.actions)}
        // style={{ marginLeft: '-1px' }}
        disabled={value < 1 || value >= max || disabled}
      >
        {increasing ? <LoadingDots className="bg-black w-1 h-1" /> : <PlusIcon width={18} height={18} />}
      </button>
    </div>
  );
};

export default Quantity;
