import { TCategory } from "../types/book";
import { TCategoryListItem } from "../types/category";
import { formatCategory } from "./formatText";

type TOptionParams = {
    value: string,
    label: string
}

export const getCategoryNameList = (response: TCategoryListItem[]) : TOptionParams[] => {
    const categories : TOptionParams[] = []
    if (!response) return []
    response.forEach((item: TCategoryListItem) => {
        const category : TOptionParams = {
            value: item.name,
            label: formatCategory(item.name)
        }   
        categories.push(category)
    })
    return categories
}

export const findCategoryIdByName = (name: string, categories: TCategory[]) : string => {
    if (!categories) return ""
    const item = categories.filter((item) => item.name === name)
    return item[0].categoryId
}

export const findCategoryNameById = (id: string, categories: TCategory[]) : string => {
    if (!categories) return ""
    const item = categories.filter((item) => item.categoryId === id)
    return item[0] ? item[0].name : ""
}