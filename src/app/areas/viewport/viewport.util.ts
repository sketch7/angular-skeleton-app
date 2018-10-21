import { Dictionary } from "@ssv/core";

export interface ViewportSizeMatcherExpression {
	size: string;
	operation: ComparisonOperation;
}

export function isViewportSizeMatcherExpression(
	arg: any | ViewportSizeMatcherExpression,
): arg is ViewportSizeMatcherExpression {
	if (!arg) {
		return false;
	}
	if (arg.size && arg.operation) {
		return true;
	}
	return false;
}

export enum ComparisonOperation {
	equals = "=",
	notEquals = "<>",
	lessThan = "<",
	lessOrEqualThan = "<=",
	greaterThan = ">",
	greaterOrEqualThan = ">=",
}

export const COMPARISON_OPERATION_FUNC_MAPPING: Dictionary<(a: number, b: number) => boolean> = {
	[ComparisonOperation.equals]: (a: number, b: number) => a === b,
	[ComparisonOperation.notEquals]: (a: number, b: number) => a !== b,
	[ComparisonOperation.lessThan]: (a: number, b: number) => a < b,
	[ComparisonOperation.lessOrEqualThan]: (a: number, b: number) => a <= b,
	[ComparisonOperation.greaterThan]: (a: number, b: number) => a > b,
	[ComparisonOperation.greaterOrEqualThan]: (a: number, b: number) => a >= b,
};

