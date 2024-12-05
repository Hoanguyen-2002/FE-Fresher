import { TCategoryListItem } from "../types/category";
import { formatCategory } from "./categoryFormat";

type TOptionParams = {
    value: string,
    label: string
}

export const getCategoryNameList = (response: TCategoryListItem[]) : TOptionParams[] => {
    const categories : TOptionParams[] = []
    response.forEach((item: TCategoryListItem) => {
        const category : TOptionParams = {
            value: item.name,
            label: formatCategory(item.name)
        }   
        categories.push(category)
    })
    return categories
}

export const findCategoryIdByName = (name: string, categories: TCategoryListItem[]) : string => {
    const item = categories.filter((item) => item.name === name)
    return item[0].categoryId
}

export const findCategoryNameById = (id: string, categories: TCategoryListItem[]) : string => {
    const item = categories.filter((item) => item.categoryId === id)
    return item[0].categoryId
}