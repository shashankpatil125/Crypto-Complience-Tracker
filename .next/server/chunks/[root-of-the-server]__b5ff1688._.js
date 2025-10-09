module.exports = [
"[project]/.next-internal/server/app/api/tokens/register-mock/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/tokens/register-mock/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(request) {
    try {
        // Get the authorization header
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Access token required'
            }, {
                status: 401
            });
        }
        // Extract token
        const token = authHeader.substring(7);
        // Simple token validation (in real app, you'd validate JWT)
        if (!token || token.length < 10) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: 'Invalid token'
            }, {
                status: 401
            });
        }
        // Parse request body
        const body = await request.json();
        // Validate required fields
        const requiredFields = [
            'tokenName',
            'tokenSymbol',
            'tokenCategory',
            'tokenType',
            'description',
            'issuerName',
            'legalEntityName',
            'websiteUrl',
            'tokenStandard',
            'totalSupply',
            'regulatoryStatus'
        ];
        const missingFields = requiredFields.filter((field)=>!body[field]);
        if (missingFields.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            }, {
                status: 400
            });
        }
        // Simulate successful registration
        const registrationData = {
            _id: `token_mock_${Date.now()}`,
            tokenName: body.tokenName,
            tokenSymbol: body.tokenSymbol,
            tokenCategory: body.tokenCategory,
            tokenType: body.tokenType,
            description: body.description,
            issuerName: body.issuerName,
            legalEntityName: body.legalEntityName,
            websiteUrl: body.websiteUrl,
            whitepaperUrl: body.whitepaperUrl,
            blockchainNetworks: body.blockchainNetworks || [],
            contractAddresses: body.contractAddresses || [],
            tokenStandard: body.tokenStandard,
            totalSupply: body.totalSupply,
            regulatoryStatus: body.regulatoryStatus,
            complianceContacts: body.complianceContacts || [],
            kycRequirements: body.kycRequirements,
            transferRestrictions: body.transferRestrictions,
            amlPolicyUrl: body.amlPolicyUrl,
            usesWhitelist: body.usesWhitelist || false,
            lastSecurityAuditDate: body.lastSecurityAuditDate,
            status: 'PENDING_REVIEW',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            mockEndpoint: true // Flag to indicate this is from mock endpoint
        };
        // Log the registration for debugging
        console.log('✅ Token registration (MOCK) successful:', {
            tokenName: body.tokenName,
            tokenSymbol: body.tokenSymbol,
            category: body.tokenCategory,
            timestamp: new Date().toISOString()
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Token registration submitted successfully (MOCK ENDPOINT)',
            data: registrationData
        }, {
            status: 201
        });
    } catch (error) {
        console.error('❌ Token registration (MOCK) error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: 'Internal server error during token registration (MOCK)',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b5ff1688._.js.map