/**
 * @abstract Component for rendering the pagination links
 */
import Link from 'next/link';
import React from 'react';
import { PaginationRenderItemParams } from '@material-ui/lab';
import { ParsedUrlQuery } from 'querystring';

export interface MaterialUiLinkProps {
    item: PaginationRenderItemParams;
    query: ParsedUrlQuery;
}

const MyComponent = React.forwardRef(({ item, query, ...props }: MaterialUiLinkProps, ref) => (
    <Link
        href={{
            pathname: '/cars',
            query: { ...query, page: item.page },
        }}
    >
        <a {...props} ></a>
    </Link>
)
)
MyComponent.displayName = 'MaterialUiLink';

export default MyComponent;
