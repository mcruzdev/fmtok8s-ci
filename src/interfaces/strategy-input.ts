export interface StrategyInput {
    tag: Tag
    branch: Branch
}

export interface Tag {
    value: string
    valid: boolean
}

export interface Branch {
    name: string
}
