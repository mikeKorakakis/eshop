import React, { Dispatch, SetStateAction } from 'react';
import ReactSlider, { ReactSliderProps } from 'react-slider';
import clsx from 'clsx';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { Dictionary } from '@/lib/get-dictionary';

const RangeSlider = <T extends number | readonly number[]>(
  props: ReactSliderProps<T> & {
    setPrices: Dispatch<SetStateAction<number[]>>;
    maxPrice: number;
    setMinPT: Dispatch<SetStateAction<number>>;
    setMaxPT: Dispatch<SetStateAction<number>>;
    // setSkip: Dispatch<SetStateAction<number>>;
    dictionary: Dictionary;
  }
) => {
  const common_dictionary = props.dictionary.common;
  const { setMinPT, setMaxPT, maxPrice, value } = props;
  //   const isVertical = props.orientation === "vertical";
  return (
    <>
      <ReactSlider
        min={0}
        max={maxPrice}
        value={value}
        onChange={(value) => {
          props.setPrices(value as number[]);
        }}
        {...props}
        // eslint-disable-next-line no-unused-vars
        renderThumb={(props, state) => (
          <div
            {...props}
            className="mt-1 flex h-6 w-6 cursor-grab items-center justify-center rounded-full bg-red-500 text-xs text-white focus-visible:outline-none"

            //   className={clsx({
            //     "h-full": !isVertical,
            //     "w-full": isVertical,
            //     "aspect-square rounded-full bg-red-500 text-xs text-white flex items-center justify-center cursor-grab focus-visible:outline-none":
            //       true,
            //   })}
          >
            <div className="h-2 w-2 rounded-full bg-white"></div>
            {/* 1 */}
            {/* {state.valueNow} */}
          </div>
        )}
        renderTrack={(props, state) => {
          const points = Array.isArray(state.value) ? state.value.length : null;
          const isMulti = points && points > 0;
          const isLast = isMulti ? state.index === points : state.index != 0;
          const isFirst = state.index === 0;
          return (
            <div
              {...props}
              className={clsx({
                // "w-full h-1/2": true,
                'top-1/2 h-1/4 -translate-y-1/2': true,
                'rounded-full': true,
                //   "bg-gray-200": isMulti ? isFirst || isLast : isLast,
                'bg-red-500': isMulti ? !isFirst || !isLast : isFirst
              })}
            ></div>
          );
        }}
        renderMark={(props) => {
          return (
            <div
              {...props}
              className={clsx({
                'top-1/2 -translate-y-1/2': true,
                //   "left-1/2 -translate-x-1/2": isVertical,
                'h-1 w-1': true,
                'rounded-full bg-red-500': true
              })}
            ></div>
          );
        }}
      />
      <div className="mt-1 flex justify-around	">
        <div className="flex">
          <label
            htmlFor="price"
            className="my-auto mr-2 block   text-sm font-medium text-gray-700 md:hidden lg:block"
          >
            {common_dictionary.price}
          </label>
          <PriceInput
            aria-label="min price"
            maxPrice={maxPrice}
            maxValue={value && Array.isArray(value) && value[1]}
            value={value && Array.isArray(value) && value[0]}
            onChange={(val: number) => {
              props.setPrices([val, value && Array.isArray(value) && value[1]]);
            }}
            label={common_dictionary.price}
          />{' '}
          <label htmlFor="price" className="mx-1 my-auto block text-sm font-medium text-gray-700">
            -
          </label>
          <PriceInput
            aria-label="max price"
            maxPrice={props.maxPrice}
            minValue={value && Array.isArray(value) && value[0]}
            value={value && Array.isArray(value) && value[1]}
            onChange={(val: number) => {
              props.setPrices([value && Array.isArray(value) && value[0], val]);
            }}
            label={common_dictionary.max_price}
          />
        </div>
        <button
          onClick={() => {
            setMinPT(value && Array.isArray(value) && value[0]);
            setMaxPT(value && Array.isArray(value) && value[1]);
          }}
          type="button"
          aria-label="price filter"
          className="ml-1 mt-auto  inline-flex h-8 items-center rounded-md border border-transparent bg-red-500 p-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <FunnelIcon className="m-1 h-4 w-4" aria-hidden="true" />
        </button>
        {/* <span className="text-sm text-gray-500">
          {props?.value && Array.isArray(props?.value) &&value[0]} €
        </span>
        <span className="text-sm text-gray-500">
          {props?.value && Array.isArray(props?.value) &&value[1]} €
        </span> */}
      </div>
    </>
  );
};
export default RangeSlider;

interface PriceInputProps {
  value: number;
  label: string;
  onChange?: any;
  maxValue?: number;
  minValue?: number;
  maxPrice: number;
}

const PriceInput = ({
  value,
  //   label,
  onChange,
  maxValue,
  minValue,
  maxPrice
}: PriceInputProps) => {
  return (
    <div className="flex">
      {/* <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700 my-auto"
      >
        {label}
      </label> */}
      {/* {value} */}
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
          <span className="text-gray-500 sm:text-xs">€</span>
        </div>
        <input
          value={value}
          type="number"
		  step="0.01"
          name="price"
          className="block h-8 w-[5rem] rounded-md border-gray-300 pl-4 focus:border-red-500 focus:ring-red-500 sm:text-xs"
          onChange={(e) => {
            if (Number(e.target.value) < 0) {
              onChange(0);
            } else if (Number(e.target.value) > maxPrice) {
              onChange(Number(maxPrice));
            } else if (maxValue && Number(e.target.value) > maxValue) {
              onChange(Number(maxValue));
            } else if (minValue && Number(e.target.value) < minValue) {
              onChange(Number(minValue));
            } else {
              onChange(Number(e.target.value));
            }
          }}
          //   placeholder={value}
          aria-describedby="price-currency"
        />
      </div>
    </div>
  );
};
