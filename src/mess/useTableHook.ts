import { useEffect, useState, useCallback, useRef, Dispatch } from 'react';
type onRowSelectedCb = (keys: Array<any>, rows: Array<Object>) => void;
type UseTableHook = (
    // 请求函数
    service?: any,
    options?: {
        // 默认请求参数
        defaultParam?: any;
        // 列表选中后的回调
        onRowSelect?: onRowSelectedCb;
        // 只在param变化时触发effect(初次不请求数据)
        updateEffect?: boolean;
    },
) => {
    dataSource: any[];
    total: number;
    loading: boolean;
    pagination: any;
    rowSelection: { keys: Array<any>; onChange: onRowSelectedCb };
    search: Dispatch<any>;
    reload: () => void;
};
const useTableHook: UseTableHook = (service, options = {}) => {
    const { defaultParam, onRowSelect, updateEffect = false } = options;
    const [pageParam, setPageParam] = useState({
        pageNo: defaultParam?.pageNo || 1,
        pageSize: defaultParam?.pageSize || 10,
    });
    const [searchParam, setSearchParam] = useState(defaultParam || {});
    // 用来触发render
    const [dep, forceUpdate] = useState(0);
    // table数据
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    // 选中的行
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await service({
                ...searchParam,
                ...pageParam,
            });
            setDataSource(res.data.records || []);
            setTotal(res.data.total || 0);
            setLoading(false);
        } catch (e) {
            console.error('useTable catched error', e);
            setLoading(false);
        }
    }, [service, searchParam, pageParam]);

    // 记录是否是初次加载
    const isMounted = useRef(false);
    useEffect(() => {
        if (updateEffect && !isMounted.current) {
            isMounted.current = true;
        } else {
            fetchData();
        }
    }, [fetchData, updateEffect, dep]);

    const pagination = {
        current: pageParam.pageNo,
        pageSize: pageParam.pageSize,
        total,
        onChange: (page, pageSize) => {
            setPageParam({
                pageNo: page,
                pageSize,
            });
        },
    };
    const rowSelection = {
        keys: selectedRowKeys,
        onChange: (keys, rows) => {
            setSelectedRowKeys(keys);
            onRowSelect && onRowSelect(keys, rows);
        },
    };
    const reload = useCallback(() => {
        forceUpdate((n) => n + 1);
    }, []);
    return {
        dataSource,
        total,
        loading,
        pagination,
        rowSelection,
        search: setSearchParam,
        reload,
    };
};
export default useTableHook;
