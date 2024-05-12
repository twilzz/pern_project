import { makeAutoObservable } from 'mobx'

export interface IDeviceType {
  id: number
  name: string
}

export interface IDeviceBrand {
  id: number
  name: string
}

export interface IDevice {
  id: number
  brand: string
  model: string
  description: string
  price: number
  rating: number
}

export interface IDeviceStore {
  type: IDeviceType[]
  brands: IDeviceBrand[]
  devices: IDevice[]
  selectedType: IDeviceType[] | null
  selectedBrands: IDeviceBrand[] | null
}

export default class DeviceStore implements IDeviceStore {
  private _type: IDeviceType[] = [
    { id: 1, name: 'Холодильники' },
    { id: 2, name: 'Смартфоны' },
    { id: 3, name: 'Телевизоры' },
    { id: 4, name: 'Ноутбуки' },
  ]
  private _brands: IDeviceBrand[] = [
    { id: 1, name: 'Samsung' },
    { id: 2, name: 'Apple' },
    { id: 3, name: 'Lenovo' },
    { id: 4, name: 'Honor' },
    { id: 5, name: 'Electra' },
    { id: 6, name: 'Voltex' },
    { id: 7, name: 'Lumix' },
    { id: 8, name: 'Zenith' },
  ]
  private _devices: IDeviceStore['devices'] = [
    {
      id: 1,
      brand: 'Electra',
      model: 'Electra X1',
      description:
        'смартфон с процессором Snapdragon 855, 6.2-дюймовым экраном и 128 ГБ памяти, идеальный выбор для производительности и развлечений',
      price: 0,
      rating: 4,
    },
    {
      id: 2,
      brand: 'Electra',
      model: 'Electra Max',
      description:
        'мощный телефон с процессором MediaTek Helio G90T, 6.5-дюймовым экраном и 256 ГБ памяти, идеальный для игр и мультимедиа.',
      price: 0,
      rating: 4,
    },
    {
      id: 3,
      brand: 'Electra',
      model: 'Electra Edge',
      description:
        'стильный смартфон с процессором Exynos 980, безграничным 6.7-дюймовым экраном и 512 ГБ памяти, идеальный для работы и развлечений.',
      price: 0,
      rating: 4,
    },
    {
      id: 4,
      brand: 'Electra',
      model: 'Electra Fusion',
      description:
        'инновационный телефон с процессором Kirin 990, 6.4-дюймовым экраном и 128 ГБ памяти, сочетает в себе элегантность и производительность.',
      price: 0,
      rating: 4,
    },
    {
      id: 5,
      brand: 'Voltex',
      model: 'Voltex Vibe',
      description:
        'Мощный смартфон с процессором Snapdragon 865, 6,5-дюймовым экраном и 128 ГБ памяти для быстрой работы и хранения данных.',
      price: 0,
      rating: 4,
    },
    {
      id: 6,
      brand: 'Voltex',
      model: 'Voltex Pro',
      description:
        'Производительный аппарат с чипсетом MediaTek Dimensity 1200, 6,7-дюймовым дисплеем и 256 ГБ встроенной памяти для удовлетворения всех потребностей.',
      price: 0,
      rating: 4,
    },
    {
      id: 7,
      brand: 'Voltex',
      model: 'Voltex Spark',
      description:
        'Элегантный гаджет с процессором Exynos 2100, 6,4-дюймовым экраном и 512 ГБ памяти для комфортного использования и хранения мультимедийных файлов.',
      price: 0,
      rating: 4,
    },
    {
      id: 8,
      brand: 'Voltex',
      model: 'Voltex Elite',
      description:
        'Стильный телефон с чипом Kirin 9000, 6,2-дюймовым дисплеем и 64 ГБ внутренней памяти для удобной навигации и хранения личных данных.',
      price: 0,
      rating: 4,
    },
    {
      id: 9,
      brand: 'Lumix',
      model: 'Lumix Elegance',
      description:
        'Snapdragon 765, 6.3-дюймовый дисплей, 128 ГБ памяти, 2021 год. Элегантный телефон с мощным процессором для плавной работы и достаточным объемом памяти для всех ваших потребностей.',
      price: 0,
      rating: 4,
    },
    {
      id: 10,
      brand: 'Lumix',
      model: 'Lumix Infinity',
      description:
        'MediaTek Helio G95, 6.7-дюймовый экран, 256 ГБ памяти, 2022 год. Телефон с экраном Infinity с высокопроизводительным процессором и большим объемом памяти для любителей мультимедиа.',
      price: 0,
      rating: 4,
    },
    {
      id: 11,
      brand: 'Lumix',
      model: 'Lumix Blaze',
      description:
        'Exynos 980, 6.5-дюймовый дисплей, 64 ГБ памяти, 2020 год. Blaze предлагает баланс между производительностью и доступностью с приличным процессором и достаточным объемом хранения.',
      price: 0,
      rating: 4,
    },
    {
      id: 12,
      brand: 'Lumix',
      model: 'Lumix Nova',
      description:
        'Kirin 820, 6.4-дюймовый экран, 512 ГБ памяти, 2021 год. Nova сочетает в себе мощную производительность с достаточным объемом памяти для бесперебойного мультитаскинга и хранения данных.',
      price: 0,
      rating: 4,
    },
    {
      id: 13,
      brand: 'Zenith',
      model: 'Zenith ZenPhone',
      description: '',
      price: 0,
      rating: 4,
    },
    {
      id: 14,
      brand: 'Zenith',
      model: 'Zenith Ultra',
      description: '',
      price: 0,
      rating: 4,
    },
    {
      id: 15,
      brand: 'Zenith',
      model: 'Zenith Horizon',
      description: '',
      price: 0,
      rating: 4,
    },
    {
      id: 16,
      brand: 'Zenith',
      model: 'Zenith Fusion',
      description: '',
      price: 0,
      rating: 4,
    },
    {
      id: 17,
      brand: 'Electrona',
      model: 'Electrona Spark, description: "", price: 0',
      description: '',
      price: 0,
      rating: 4,
    },
    {
      id: 18,
      brand: 'Electrona',
      model: 'Electrona Wave',
      description: '',
      price: 0,
      rating: 4,
    },
    {
      id: 19,
      brand: 'Electrona',
      model: 'Electrona Pulse',
      description: '',
      price: 0,
      rating: 4,
    },
    {
      id: 20,
      brand: 'Electrona',
      model: 'Electrona Nova',
      description: '',
      price: 0,
      rating: 4,
    },
  ]
  private _selectedType: IDeviceStore['selectedType'] = null

  private _selectedBrands: IDeviceStore['selectedBrands'] = []

  constructor() {
    makeAutoObservable(this)
  }

  public get type() {
    return this._type
  }

  public get brands() {
    return this._brands
  }

  public get devices() {
    return this._devices
  }

  public get selectedType() {
    return this._selectedType
  }

  public get selectedBrands() {
    return this._selectedBrands
  }

  public setType = (type: IDeviceType[]): void => {
    this._type = type
  }
  public setBrands = (brands: IDeviceBrand[]) => {
    this._brands = brands
  }
  public setDevice = (devices: IDeviceStore['devices']) => {
    this._devices = devices
  }
  public setSelectedType = (type: IDeviceType[] | null) => {
    this._selectedType = type
  }

  public setSelectedBrands = (brand: IDeviceBrand | null) => {
    if (this._selectedBrands && brand) {
      const brandInList = Boolean(
        this._selectedBrands?.find((sB) => sB.id === brand.id)
      )
      if (brandInList) {
        const newList = this._selectedBrands.filter((sB) => sB.id !== brand.id)
        this._selectedBrands = newList
      } else {
        const newList = this._selectedBrands.concat(brand)
        this._selectedBrands = newList
      }
    }
  }
}
