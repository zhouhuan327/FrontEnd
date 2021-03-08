import { useEffect, useRef } from 'react';
// 打印rerender时props具体的变化
// 用于找出那个属性导致子组件重复渲染
const useWhyDidYouUpdate = (name, props) => {
    const previousProps = useRef<any>();
    useEffect(() => {
        if (previousProps.current) {
            const allKeys = Object.keys({ ...previousProps.current, ...props });
            const changesObj = {};
            allKeys.forEach((key) => {
                if (previousProps.current[key] !== props[key]) {
                    changesObj[key] = {
                        from: previousProps.current[key],
                        to: props[key],
                    };
                }
            });

            if (Object.keys(changesObj).length) {
                console.log(
                    `%c why ${name} update %c`,
                    'background:#ffa940 ; padding: 1px; border-radius: 6px 0 0 3px;  color: #fff',
                    'background:transparent',
                    changesObj,
                );
            }
        }
        previousProps.current = props;
    });
};
export default useWhyDidYouUpdate;
