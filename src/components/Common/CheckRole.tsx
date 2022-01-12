import * as React from 'react';
import { NotFound } from '.';

function grantPermission(props: string[]): Boolean{

    const permissions = localStorage.getItem('role') || "public";
    
    return props.includes(permissions);
}

export function RoleBaseRouting(props: any) : any{
    return grantPermission(props.role) ? props.element : <NotFound />
}