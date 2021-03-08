import { useState, useCallback, Dispatch, useRef } from 'react';
import request from 'utils/request';
import useSWR from 'swr';
import produce from 'immer';
type onRowSelectedCb = (keys: Array<any>, rows: Array<Object>) => void;
type useSwrTableProps = (
    // api
    url: string,
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
const useSwrTable: useSwrTableProps = (url, options = {}) => {
    const { defaultParam, onRowSelect, updateEffect = false } = options;
    // 搜索参数
    const [searchParam, setSearchParam] = useState(defaultParam || {});
    // 分页参数
    const [pageParam, setPageParam] = useState({
        pageNo: defaultParam?.pageNo || 1,
        pageSize: defaultParam?.pageSize || 10,
    });
    const [tableData, setTableData] = useState({
        dataSource: [],
        total: 0,
        selectedRowKeys: [],
        loading: true,
    });
    // 判断是否第一次渲染
    const isMounted = useRef(false);
    const { mutate } = useSWR(
        [url, searchParam, pageParam],
        async (url, searchParam, pageParam, projectId) => {
            if (updateEffect && !isMounted.current) {
                isMounted.current = true;
                return;
            }
            const res = await request({
                url,
                method: 'post',
                data: {
                    ...searchParam,
                    ...pageParam,
                },
            });
            if (res?.code === 200 && res?.data) {
                setTableData(
                    produce(tableData, (draft) => {
                        draft.dataSource = res.data?.records;
                        draft.total = res.data?.total;
                        draft.loading = false;
                    }),
                );
            }
        },
    );
    const pagination = {
        current: pageParam.pageNo,
        pageSize: pageParam.pageSize,
        total: tableData.total,
        onChange: (page, pageSize) => {
            setPageParam({
                pageNo: page,
                pageSize,
            });
        },
    };
    const rowSelection = {
        keys: tableData.selectedRowKeys,
        onChange: (keys, rows) => {
            setTableData(
                produce(tableData, (draft) => {
                    draft.selectedRowKeys = keys;
                }),
            );
            onRowSelect && onRowSelect(keys, rows);
        },
    };
    const reload = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        dataSource: tableData.dataSource,
        total: tableData.total,
        loading: tableData.loading,
        pagination,
        rowSelection,
        search: setSearchParam,
        reload,
    };
};
export default useSwrTable;
