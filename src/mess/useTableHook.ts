import { useEffect, useState, useCallback } from 'react';
import { RootState } from 'types/RootState';
import { useSelector } from 'react-redux';

type onRowSelectCallback = (keys: Array<number>, rows: Array<Object>) => void;
const useTableHook = (service, rowCb?: onRowSelectCallback, page?: any) => {
    const projectId: Array<number> = useSelector((state: RootState) => state.global.projectId);
    const [pageParam, setPageParam] = useState(page || { pageNo: 1, pageSize: 10 });
    const [searchParam, setSearchParam] = useState({});
    // 用来触发render
    const [N, setN] = useState(0);
    // table数据
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState<number>(0);

    const [loading, setLoading] = useState(false);
    // 选中的行
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await service({ ...searchParam, ...pageParam, projectId });
            setDataSource(res.data.results || []);
            setTotal(res.data.count || 0);
            setLoading(false);
        } catch (e) {
            console.error('useTable catched error', e);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageParam, searchParam, projectId, N]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
            rowCb && rowCb(keys, rows);
        },
    };

    return {
        dataSource,
        total,
        loading,
        pagination,
        rowSelection,
        search: setSearchParam,
        reload: () => setN((n) => n + 1),
    };
};
export default useTableHook;
