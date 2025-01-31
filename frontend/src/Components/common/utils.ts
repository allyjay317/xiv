export function getSize(size: 'S' | 'M' | 'L' | 'XS'){
    
        if (size === 'XS') return 12
        if (size === 'S') return 16
        if (size === 'M') return 24
        if (size === 'L') return 32
    return 12
}