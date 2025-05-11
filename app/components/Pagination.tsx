import {useLocation} from "react-router";

interface paginationProps {
    totalItems: number;
}

export default function (props: paginationProps) {
    const {totalItems} = props;

    let searchParams = new URLSearchParams(useLocation().search);

    const currentPage = Number(searchParams.get('page') ?? 1);

    const lastPage = Math.max(Math.floor((totalItems - 1) / 12 + 1), 1);
    const startPage = Math.max(1, Math.min(currentPage - 2, lastPage - 4));
    const endPage = Math.min(startPage + 4, lastPage);

    const innerRange = [];
    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
        innerRange.push(pageNumber);
    }

    searchParams.delete('page');

    let base_url = useLocation().pathname + "?"
    if (searchParams.size != 0) {
        base_url += searchParams.toString() + "&";
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">

                <li className="page-item">
                    <a className="page-link" href={base_url + "page=1"}>
                        <i className="bi bi-chevron-double-left"></i>
                    </a>
                </li>

                {innerRange.map((pageNumber) => {
                    const active = pageNumber == currentPage ? " active" : "";
                    return (
                        <li className="page-item">
                            <a className={"page-link" + active} href={base_url + "page=" + pageNumber}>{pageNumber}</a>
                        </li>
                    )
                })}

                <li className="page-item">
                    <a className="page-link" href={base_url + "page=" + lastPage}>
                        <i className="bi bi-chevron-double-right"></i>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
