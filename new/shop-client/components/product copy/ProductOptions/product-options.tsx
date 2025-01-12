import { memo } from 'react'
import Swatch from '@/components/product/Swatch'
import { SelectedOptions } from '../helpers'
import {  ProductOptionGroup } from '@/lib/vendure/generated/graphql-shop'

interface ProductOptionsProps {
  options: ProductOptionGroup[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  return (
    <div>
      {options.map((opt) => (
        <div className="pb-4" key={opt.id}>
          <h2 className="uppercase font-medium text-sm tracking-wide">
            {opt.name}
          </h2>
          <div role="listbox" className="py-4 flex flex-wrap gap-4">
            {opt.options.map((v, i: number) => {
              const active = selectedOptions[opt.name.toLowerCase()]
              return (
                  <Swatch
                    key={`${opt.id}-${i}`}
                    active={v.name.toLowerCase() === active}
                    variant={opt.name}
                    color={""}
                    // color={v.hexColors ? v.hexColors[0] : ''}
                    label={v.name}
                    onClick={() => {
                      setSelectedOptions((selectedOptions) => {
                        return {
                          ...selectedOptions,
                          [opt.name.toLowerCase()]:
                            v.name.toLowerCase(),
                        }
                      })
                    }}
                  />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(ProductOptions)
