import { parse, stringify } from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { useRef, useMemo } from 'react';

interface UrlState {
    [key: string]: any;
}
interface Options {
    navigateMode?: 'push' | 'replace';
}

export default function useUrlState<T extends UrlState = UrlState>(
    initialState?: T,
    options?: Options,
) {
    const { navigateMode = 'replace' } = options || {};
    type state = Partial<{ [key in keyof T]: any }>;
    const history = useHistory();
    const location = useLocation();
    // 获得url中的参数
    const queryFromUrl = useMemo(() => {
        return parse(location.search.slice(1));
    }, [location.search]);
    // 初始参数
    const initialStateRef = useRef(initialState || {});

    const targetQuery = {
        ...initialStateRef.current,
        ...queryFromUrl,
    } as state;

    const setState = (s: React.SetStateAction<state>) => {
        const newQuery = typeof s === 'function' ? (s as Function)(targetQuery) : s;

        history[navigateMode]({
            hash: location.hash,
            search: stringify({ ...queryFromUrl, ...newQuery }) || '?',
        });
        console.log(queryFromUrl);
    };

    return [targetQuery, setState] as const;
}
