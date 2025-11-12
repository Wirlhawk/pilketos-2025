import React from "react";
import PaslonResultsCard from "./paslon-result-card";

export default function PaslonResultList({
    results,
}: {
    results: {
        voteCount: number;
        percentage: number;
        _count: {
            perolehan: number;
        };
        id: number;
        image: string;
        ketos: string;
        waketos: string;
    }[];
}) {
    return (
        <div className="@container/main  grid grid-cols-3 gap-4  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ">
            {results.map((result) => (
                <PaslonResultsCard
                    key={result.id}
                    id={result.id}
                    ketos={result.ketos}
                    waketos={result.waketos}
                    votePercentage={result.percentage}
                    voteCount={result.voteCount}
                />
            ))}
        </div>
    );
}
